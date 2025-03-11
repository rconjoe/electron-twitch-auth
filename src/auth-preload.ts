import { contextBridge } from 'electron';

// eslint-disable-next-line
interface AuthHelperApi { }

contextBridge.exposeInMainWorld('authHelper', {} as AuthHelperApi);
