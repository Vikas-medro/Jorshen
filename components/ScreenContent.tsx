import React from 'react';
import { Text, View } from 'react-native';

import { EditscreensInfo } from './EditscreensInfo';

type screensContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const screensContent = ({ title, path, children }: screensContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditscreensInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center bg-black`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
