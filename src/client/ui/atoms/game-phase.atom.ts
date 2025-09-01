import { atom } from '@rbxts/charm';

export type GamePhase = 'loading' | 'main';
export const gamePhaseAtom = atom<GamePhase>('loading');
