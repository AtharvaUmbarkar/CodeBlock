'use client';

import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ProfileFormSchema = z.object({
  displayName: z.string({ required_error: 'Cannot be empty!' }).min(5, { message: 'Should be between 5 to 20 characters!' }).max(20, { message: 'Should be between 5 to 20 characters!' }),
  email: z.string().email({ message: 'Not a valid email address!' }),
  mobile: z.string().optional(),
  country: z.string().optional(),
  profilePictureData: z.string().optional(),
})

type ProfileForm = z.infer<typeof ProfileFormSchema>;

interface PhoneCode {
  E164: string;
  phone_code: string;
  country_name: string;
}

const phoneCodesQueryFn = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + '/data/country_codes.json');
  const res: PhoneCode[] = await response.json();
  return res;
}

const userDataQueryFn = async (authID: string | undefined) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_ROOT_URL + '/api/user/get-user',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authID }),
    })
  const res = await response.json()
  return res;
}

const decoder = new TextDecoder();

const userDataMutationFn = async (userData: ProfileForm, authID: string | undefined) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_ROOT_URL + '/api/user/update-user',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        authID: authID,
        profilePictureData: userData.profilePictureData ? userData.profilePictureData : undefined,
        lastModified: Date.now(),
      }),
    })
  const res = await response.json();
  return res;
}

const Profile = () => {
  const [profileEditable, setProfileEditable] = useState(false);
  const [profileImageString, setProfileImageString] = useState<string>("");
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ProfileForm>({ resolver: zodResolver(ProfileFormSchema) });

  const { data: session, status: authStatus } = useSession();
  const authID = session?.user.id;

  const { data: userData, isLoading: loadingQuery } = useQuery({
    queryKey: ['get-user', authID],
    queryFn: () => userDataQueryFn(authID),
    enabled: !!authID,
  })

  const { data: phoneCodes, isLoading: loadingCodes } = useQuery({
    queryKey: ['phone-codes'],
    queryFn: phoneCodesQueryFn,
  })

  const { mutate: mutateUserData, isLoading: loadingMutation } = useMutation({
    mutationKey: ['update-user', authID, userData],
    mutationFn: ({ authID, userData }: { authID: string | undefined, userData: ProfileForm }) => userDataMutationFn(userData, authID),
  })

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    setProfileEditable(false);
    data.profilePictureData = profileImageString;
    mutateUserData({ authID: authID, userData: data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-user'] });
      },
    });
    setProfileImageString("");
  };

  const handleEditProfile = () => {
    if (profileEditable) {
      reset();
      setProfileImageString("");
    }
    setProfileEditable(!profileEditable);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const stringReader = new FileReader();
    stringReader.onload = () => {
      setProfileImageString(stringReader.result as string);
    }
    if (file) {
      stringReader.readAsDataURL(file);
    }
  }

  const loading = !userData || loadingMutation || !phoneCodes || !session;

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} width={{ xs: '100%', xl: '50%' }} direction={'column'} alignSelf={'start'} padding={2} sx={{ bgcolor: 'white.main', borderRadius: 1 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h5' alignSelf={'start'}>Profile</Typography>
        <div>
          <Button disableElevation size='small' variant={'contained'} onClick={() => handleEditProfile()}>{profileEditable ? <CloseIcon /> : <EditIcon />}</Button>
          <Button type='submit' disableElevation disabled={!profileEditable} size='small' variant={'contained'} sx={{ marginLeft: 1 }}><SaveIcon /></Button>
        </div>
      </Stack>
      {loading && <div>Loading</div>}
      {!loading &&
        <Stack direction={{ xs: 'column', md: 'row' }} marginY={3}>
          <Stack direction={'column'} rowGap={0.5} marginBottom={2} alignItems={{ xs: 'center' }}>
            <Avatar variant='rounded' alt={userData.data.name} src={profileImageString ? profileImageString : userData.data.profilePictureLink} sx={{ height: 120, width: 120 }} />
            <Button disabled={!profileEditable} component={'label'} startIcon={<PhotoIcon />} variant={'contained'} disableElevation size={'small'} sx={{ width: { xs: 120, md: '100%' } }}>
              Change
              <input type={'file'} accept='image/*' multiple={false} hidden onChange={handleImageChange} />
            </Button>
          </Stack>
          <Stack direction={'column'} width={'100%'} alignItems={'center'} marginX={{ xs: 0, md: 2 }} rowGap={1}>
            <TextField
              label={'User Name'}
              value={userData.data.name}
              variant='filled'
              fullWidth
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true, }}
            />
            <TextField
              label={'Account Provider'}
              value={userData.data.provider}
              variant='filled'
              fullWidth
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true, }}
            />
            <TextField
              sx={{ marginTop: 3 }}
              label={'Display Name'}
              variant='outlined'
              fullWidth
              disabled={!profileEditable}
              InputProps={{ ...register("displayName", { value: userData.data.displayName }) }}
              InputLabelProps={{ shrink: true, }}
              helperText={errors.displayName?.message}
              FormHelperTextProps={{ error: errors.displayName ? true : false }}
            />
            <TextField
              sx={{ marginTop: 1 }}
              label={'Email'}
              variant='outlined'
              fullWidth
              disabled={!profileEditable}
              InputProps={{ ...register("email", { value: userData.data.email }) }}
              InputLabelProps={{ shrink: true, }}
              helperText={errors.email?.message}
              FormHelperTextProps={{ error: errors.email ? true : false }}
            />
            <Controller
              control={control}
              name="country"
              defaultValue={userData.data.country}
              render={({ field }) => (
                <TextField
                  sx={{ marginTop: 1 }}
                  label='Country'
                  variant='outlined'
                  fullWidth
                  disabled={!profileEditable}
                  select
                  defaultValue={userData.data.country}
                  inputProps={{ ...field }}
                  InputLabelProps={{ shrink: true, }}
                >
                  {phoneCodes.map((country) => {
                    return (
                      <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
                    )
                  })}
                </TextField>
              )}
            />
            <TextField
              sx={{ marginTop: 1 }}
              label={'Mobile No.'}
              variant='outlined'
              fullWidth
              disabled={!profileEditable}
              InputProps={{ ...register("mobile", { value: userData.data.mobile }) }}
              InputLabelProps={{ shrink: true, }}
              helperText={'Include country code eg. for India: 91...'}
            />
          </Stack>
        </Stack>
      }
    </Stack>
  )
}

export default Profile