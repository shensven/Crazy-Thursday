import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, TextInput} from 'react-native-paper';
import useBrandKeywords from '../utils/useBrandKeywords';
import {type BrandKeywords} from '../atoms/appAtom';

const BrandEditer: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const {brandKeywords, setBrandKeywords} = useBrandKeywords();

  const [form, setForm] = React.useState<BrandKeywords>({
    Chinese: brandKeywords.Chinese,
    English: brandKeywords.English,
  });

  return (
    <ScrollView>
      <View style={{padding: 16, backgroundColor: '#fff'}}>
        <View style={{marginTop: 16}}>
          <TextInput
            theme={{
              roundness: 12,
              colors: {primary: '#E1352F'},
            }}
            dense
            mode="outlined"
            label="中文关键字"
            maxLength={12}
            value={form.Chinese}
            onChangeText={text => {
              setForm({...form, Chinese: text});
            }}
          />
          <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.5)', marginHorizontal: 8, marginTop: 8}}>示例：</Text>
          <Text
            style={{fontSize: 12, color: 'rgba(0,0,0,0.5)', marginHorizontal: 8, marginTop: 4, textAlign: 'justify'}}>
            我开始留头发，减重，换风格，开始往前冲，不好意思阿，这一次，{form.Chinese}疯狂星期四，我一定要吃。
          </Text>
        </View>
        <View style={{marginTop: 40, marginBottom: 8}}>
          <TextInput
            theme={{
              roundness: 12,
              colors: {primary: '#E1352F'},
            }}
            dense
            mode="outlined"
            label="英文关键字"
            maxLength={12}
            value={form.English}
            onChangeText={text => {
              setForm({...form, English: text});
            }}
          />
          <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.5)', marginHorizontal: 8, marginTop: 8}}>示例：</Text>
          <Text
            style={{fontSize: 12, color: 'rgba(0,0,0,0.5)', marginHorizontal: 8, marginTop: 4, textAlign: 'justify'}}>
            昨晚努力写的代码，今早运行起来一直报错，找不到什么原因，不知道怎么解决，求求大佬帮我看下，以下是报错信息：
            java.io.IOException: {form.English} Crazy Thursday need $50.
          </Text>
        </View>
      </View>
      <Button
        theme={{
          roundness: 12,
          colors: {primary: '#E1352F'},
        }}
        mode="contained"
        disabled={brandKeywords.Chinese === form.Chinese && brandKeywords.English === form.English}
        style={{marginHorizontal: 16, marginTop: 32, marginBottom: 32 + insets.bottom}}
        labelStyle={{lineHeight: 24}}
        onPress={() =>
          setBrandKeywords({
            Chinese: form.Chinese,
            English: form.English,
          }).then(() => navigation.goBack())
        }>
        保 存
      </Button>
    </ScrollView>
  );
};

export default BrandEditer;
