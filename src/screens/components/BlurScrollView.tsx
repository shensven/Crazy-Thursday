import React from 'react';
import {NativeModules, Platform, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/elements';
import {BlurView} from '@react-native-community/blur';
import useDesignSystem from '../../utils/useDesignSystem';

const BlurScrollView: React.FC<{
  children: React.ReactNode;
}> = props => {
  const {children} = props;

  const {StatusBarManager} = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  const headerHeight = useHeaderHeight();
  const {headerBlurType} = useDesignSystem();

  return (
    <View style={{flex: 1}}>
      <ScrollView scrollIndicatorInsets={{top: headerHeight - statusBarHeight}}>
        <View style={{marginTop: Platform.OS === 'ios' ? headerHeight : 0}}>{children}</View>
      </ScrollView>
      {Platform.OS === 'ios' && (
        <BlurView
          blurType={headerBlurType}
          blurAmount={16}
          style={{width: '100%', height: headerHeight, position: 'absolute', top: 0}}
        />
      )}
    </View>
  );
};

export default BlurScrollView;
