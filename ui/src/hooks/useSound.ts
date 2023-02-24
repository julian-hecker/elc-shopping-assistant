import { Audio, AudioMode, AVPlaybackSource } from 'expo-av';
import { useEffect, useState } from 'react';

export function useSound(source: AVPlaybackSource) {
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound(
    mode: Partial<AudioMode> = { playsInSilentModeIOS: true },
  ) {
    await Audio.setAudioModeAsync(mode);
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound };
}
