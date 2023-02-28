import { speak as expoSpeak, SpeechOptions } from 'expo-speech';
import { AccessibilityInfo } from 'react-native';

export function useSpeech() {
  async function speak(
    text: string,
    options?: SpeechOptions,
  ): Promise<void> {
    // don't speak if screen reader is running
    if (await AccessibilityInfo.isScreenReaderEnabled()) return;
    return expoSpeak(text, options);
  }

  return { speak };
}
