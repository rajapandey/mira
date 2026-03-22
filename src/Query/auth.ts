import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setUser, clearUser } from '@/store/auth-slice';
import { useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get('/auth/me')
        .then(res => res.data),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
};

export const useSignupMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: any) =>
      axios
        .post('/auth/signup', data)
        .then(res => res.data),
    onSuccess: (userData: any) => {
      dispatch(setUser(userData));
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: any) =>
      axios
        .post('/auth/login', data)
        .then(res => res.data),
    onSuccess: (userData: any) => {
      dispatch(setUser(userData));
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios
        .post('/auth/logout')
        .then(res => res.data),
    onSuccess: () => {
      dispatch(clearUser());
      queryClient.clear();
    },
  });
};

