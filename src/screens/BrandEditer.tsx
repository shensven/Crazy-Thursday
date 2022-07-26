import React from 'react';
import {Dimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import color from 'color';
import {useAtom} from 'jotai';
import BlurScrollView from './components/BlurScrollView';
import useBrandKeywords from '../utils/useBrandKeywords';
import type {BrandKeywords} from '../atoms/appAtom';
import {atomDeviceType} from '../atoms/appAtom';

const BrandEditer: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {brandKeywords, updateBrandKeywords} = useBrandKeywords();

  const [deviceType] = useAtom(atomDeviceType);

  const [form, setForm] = React.useState<BrandKeywords>({
    Chinese: brandKeywords.Chinese,
    English: brandKeywords.English,
  });

  return (
    <BlurScrollView>
      <View
        style={{
          paddingHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
          paddingTop: 16,
          backgroundColor: color(colors.secondary).alpha(0.05).toString(),
        }}>
        <View style={{marginTop: 16}}>
          <TextInput
            dense
            mode="outlined"
            label="中文关键字"
            maxLength={12}
            value={form.Chinese}
            outlineColor={color(colors.secondary).alpha(0.12).toString()}
            onChangeText={text => setForm({...form, Chinese: text})}
          />
          <Text
            style={{
              fontSize: 12,
              color: color(colors.secondary).alpha(0.8).toString(),
              margin: 12,
              textAlign: 'justify',
            }}>
            示例：我开始留短发、减肥、换风格、开始往前冲，不好意思啊，这一次，{form.Chinese}疯狂星期四，我一定要吃。
          </Text>
        </View>
        <View style={{marginTop: 24, marginBottom: 8}}>
          <TextInput
            dense
            mode="outlined"
            label="英文关键字"
            maxLength={12}
            value={form.English}
            outlineColor={color(colors.secondary).alpha(0.12).toString()}
            onChangeText={text => setForm({...form, English: text})}
          />

          <Text
            style={{
              fontSize: 12,
              color: color(colors.secondary).alpha(0.8).toString(),
              margin: 12,
              textAlign: 'justify',
            }}>
            示例：昨晚努力写的代码，今早运行起来一直报错，找不到什么原因，不知道怎么解决，求求大佬帮我看下，以下是报错信息：
            java.io.IOException: {form.English} Crazy Thursday need $50.
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        disabled={brandKeywords.Chinese === form.Chinese && brandKeywords.English === form.English}
        style={{
          marginHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
          marginTop: 40,
          marginBottom: 32 + insets.bottom,
        }}
        labelStyle={{lineHeight: 28}}
        onPress={() =>
          updateBrandKeywords({
            Chinese: form.Chinese,
            English: form.English,
          }).then(() => navigation.goBack())
        }>
        保 存
      </Button>
    </BlurScrollView>
  );
};

export default BrandEditer;
