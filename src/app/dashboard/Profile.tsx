'use client';

import React, { useEffect, useState } from 'react'

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from "react-hook-form";

interface ProfileForm {
  displayName: string,
  email: string,
  mobileNumber: string,
}

const userDataQueryFn = async (authID: string | undefined) => {
  let response = await fetch(
    process.env.NEXT_PUBLIC_ROOT_URL + '/api/user/get-user',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authID }),
    })
  const res = await response.json()
  return res;
}

const userDataMutationFn = async (userData: ProfileForm, authID: string | undefined) => {
  let response = await fetch(
    process.env.NEXT_PUBLIC_ROOT_URL + '/api/user/update-user',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        authID: authID,
        lastModified: Date.now(),
      }),
    })
  const res = await response.json();

  return res;
}

const Profile = () => {
  const [profileEditable, setProfileEditable] = useState(false)
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileForm>();

  const { data: session, status: authStatus } = useSession();
  const authID = session?.user.id;

  const { data: userData, isLoading: queryLoading } = useQuery({
    queryKey: ['get-user', authID],
    queryFn: () => userDataQueryFn(authID),
    enabled: !!authID,
  })

  const { mutate: mutateUserData, isLoading: loadingMutation } = useMutation({
    mutationKey: ['update-user', authID],
    mutationFn: ({ authID, userData }: { authID: string | undefined, userData: ProfileForm }) => userDataMutationFn(userData, authID),
  })

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    setProfileEditable(false);
    mutateUserData({ authID: authID, userData: data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-user'] })
      },
    });
  };

  const handleEditProfile = () => {
    if (profileEditable) reset();
    setProfileEditable(!profileEditable);
  }

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} width={{ xs: '100%', md: '50%' }} direction={'column'} alignSelf={'start'} padding={2} sx={{ bgcolor: 'white.main', borderRadius: 1 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h5' alignSelf={'start'}>Profile</Typography>
        <div>
          <Button disableElevation size='small' variant={'contained'} onClick={() => handleEditProfile()}>{profileEditable ? <CloseIcon /> : <EditIcon />}</Button>
          <Button type='submit' disableElevation disabled={!profileEditable} size='small' variant={'contained'} sx={{ marginLeft: 1 }}><SaveIcon /></Button>
        </div>
      </Stack>
      {!userData && loadingMutation && <div>Loading</div>}
      {userData && session && !loadingMutation &&
        <Stack direction={{ xs: 'column', md: 'row' }} marginY={3}>
          <Stack direction={'column'} rowGap={0.5} marginBottom={2} alignItems={{ xs: 'center' }}>
            <Avatar variant='rounded' alt={session.user.name} src={session.user.image} sx={{ height: 120, width: 120 }} />
            <Button disabled={!profileEditable} component={'label'} startIcon={<PhotoIcon />} variant={'contained'} disableElevation size={'small'} sx={{ width: { xs: 120, md: '100%' } }}>
              Change
              <input type={'file'} hidden />
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
            />
            <TextField
              sx={{ marginTop: 1 }}
              label={'Email'}
              variant='outlined'
              fullWidth
              disabled={!profileEditable}
              InputProps={{ ...register("email", { value: userData.data.email }) }}
              InputLabelProps={{ shrink: true, }}
            />
            <TextField
              sx={{ marginTop: 1 }}
              label={'Mobile No.'}
              variant='outlined'
              fullWidth
              disabled={!profileEditable}
              InputProps={{ ...register("mobileNumber", { value: userData.data.mobileNumber }) }}
              InputLabelProps={{ shrink: true, }}
            />
          </Stack>
        </Stack>
      }
    </Stack>
  )
}

export default Profile