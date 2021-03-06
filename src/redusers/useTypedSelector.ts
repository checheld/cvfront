import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/ConfigureStore'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;