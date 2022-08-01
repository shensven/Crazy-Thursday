import React from 'react';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import color from 'color';
import IcRoundSync from './assets/icons/IcRoundSync';
import IcRoundChevronRight from './assets/icons/IcRoundChevronRight';
import IcRoundOpenInNew from './assets/icons/IcRoundOpenInNew';
import useCopywriter from '../utils/useCopywriter';

const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

type StackParamList = {
  BrandEditer: undefined;
  Appearance: undefined;
  PrivacyPolicy: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Settings: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {colors} = useTheme();
  const {copywriter, updateCopywriter} = useCopywriter();

  const copywriterVersion = copywriter.version.toString();

  const settings = [
    {
      title: '基本',
      children: [
        {
          label: '编辑品牌关键字',
          description: '',
          leftIcon: '',
          rightIcon: <IcRoundChevronRight size={20} color={colors.onSurfaceVariant} />,
          onPress: () => navigation.navigate('BrandEditer'),
        },
        {
          label: '更新文案数据库',
          description: `v${copywriterVersion.substring(0, 4)}.${copywriterVersion.substring(
            4,
            6,
          )}.${copywriterVersion.substring(6, 8)}.${copywriterVersion.substring(8, 10)}`,
          rightIcon: <IcRoundSync size={20} color={colors.onSurfaceVariant} />,
          onPress: () => updateCopywriter(),
        },
      ],
    },
    {
      title: '其他',
      children: [
        {
          label: '外观',
          description: '',
          rightIcon: <IcRoundChevronRight size={20} color={colors.onSurfaceVariant} />,
          onPress: () => navigation.navigate('Appearance'),
        },
        {
          label: '隐私政策',
          description: '',
          rightIcon: <IcRoundChevronRight size={20} color={colors.onSurfaceVariant} />,
          onPress: () => navigation.navigate('PrivacyPolicy'),
        },
        // {
        //   label: '好评鼓励',
        //   description: '',
        //   rightIcon: <IcRoundOpenInNew size={16} color={colors.onSurfaceVariant} />,
        //   onPress: () => {},
        // },
        {
          label: '反馈意见',
          description: '',
          rightIcon: <IcRoundOpenInNew size={16} color={colors.onSurfaceVariant} />,
          onPress: () => Linking.openURL('https://github.com/shensven/Crazy-Thursday/issues'),
        },
      ],
    },
    {
      title: '联系开发者',
      children: [
        {
          label: '微博',
          description: '',
          rightIcon: <IcRoundOpenInNew size={16} color={colors.onSurfaceVariant} />,
          onPress: () => Linking.openURL('https://weibo.com/u/2449440940'),
        },
        {
          label: 'Twitter',
          description: '',
          rightIcon: <IcRoundOpenInNew size={16} color={colors.onSurfaceVariant} />,
          onPress: () => Linking.openURL('https://twitter.com/shensven2016'),
        },
        {
          label: 'GitHub',
          description: '',
          rightIcon: <IcRoundOpenInNew size={16} color={colors.onSurfaceVariant} />,
          onPress: () => Linking.openURL('https://github.com/shensven'),
        },
      ],
    },
    {
      title: '当前版本',
      children: [
        {
          label: `${version} (${buildNumber})`,
          description: '',
          rightIcon: undefined,
          onPress: undefined,
        },
      ],
    },
  ];

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 16,
          marginTop: 16,
          marginBottom: 8 + insets.bottom,
        }}>
        {settings.map(group => (
          <View key={group.title} style={{marginBottom: 16}}>
            <Text style={{fontSize: 12, color: colors.onBackground, marginLeft: 8, marginBottom: 4}}>
              {group.title}
            </Text>
            {group.children.map((child, index) => (
              <TouchableRipple
                key={child.label}
                borderless
                style={{
                  backgroundColor: color(colors.secondary).alpha(0.05).toString(),
                  height: 44,
                  justifyContent: 'center',
                  paddingLeft: 16,
                  paddingRight: 12,
                  borderTopLeftRadius: index === 0 ? 12 : 0,
                  borderTopRightRadius: index === 0 ? 12 : 0,
                  borderBottomLeftRadius: index === group.children.length - 1 ? 12 : 0,
                  borderBottomRightRadius: index === group.children.length - 1 ? 12 : 0,
                }}
                onPress={child.onPress}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{color: colors.onSurfaceVariant}}>{child.label}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, marginRight: 8, color: colors.onSurfaceVariant}}>
                      {child.description}
                    </Text>
                    <View style={{width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                      {child.rightIcon}
                    </View>
                  </View>
                </View>
              </TouchableRipple>
            ))}
          </View>
        ))}
        <View style={{marginTop: 16, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: colors.secondary}}>疯狂星期四</Text>
          <Text style={{fontSize: 10, color: color(colors.secondary).alpha(0.8).toString(), marginTop: 8}}>
            发给你的好友
          </Text>
          <Text style={{fontSize: 10, color: color(colors.secondary).alpha(0.8).toString(), marginTop: 2}}>
            让 TA 请你吃炸鸡
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
