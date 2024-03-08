import {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import colors from '../../assets/colors/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../components/common/Label/Label';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProduct, IState } from './Home.models';
import Details from '../Details/Details';
import { fakeData } from '../../constances/FakeData';

const placeHolder = require('./../../assets/images/images.png');

export default class Home extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      visibleDetails: false,
      tempId: -1
    };
  }

  componentDidMount(): void {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('products');
      this.setState({products: data != null ? JSON.parse(data) : fakeData})
    } catch {}
  }

  increment = (id: number) => {
    let tempProduct = this.state.products;
    tempProduct[id].totalCount = tempProduct[id].totalCount + 1;
    this.setState({products: tempProduct})
    AsyncStorage.setItem('products', JSON.stringify(tempProduct))
  }

  decrement = (id: number) => {
    let tempProduct = this.state.products;
    if(tempProduct[id].totalCount > 0)
      tempProduct[id].totalCount = tempProduct[id].totalCount - 1;
    else return
    this.setState({products: tempProduct})
    AsyncStorage.setItem('products', JSON.stringify(tempProduct))
  }

  render(): ReactNode {
    let {products, visibleDetails, tempId} = this.state;

    return (
      <View style={Styles.container}>
        <StatusBar animated={true} backgroundColor={colors.white100} barStyle={'dark-content'} />
        <View>
          <Label variation='headline' align='center' style={Styles.mb_32}>محصولات</Label>
          
          {products.map(product => {
            return (
              <View key={product.id} style={[Styles.rowProduct, {borderBottomWidth: product.id === (products.length - 1) ? 0 : 1 }]}>
                <View style={[Styles.flexRow, {width: '25%', justifyContent: 'space-between'}]}>
                  <TouchableOpacity onPress={() => this.decrement(product.id)} style={[Styles.itemProduct, {borderRadius: 25}]}>
                    <Icon name='minus' size={18} color={colors.black} />
                  </TouchableOpacity>
                  <Label>{product.totalCount}</Label>
                  <TouchableOpacity onPress={() => this.increment(product.id)} style={[Styles.itemProduct, {borderRadius: 25}]}>
                    <Icon name='plus' size={18} color={colors.black} />
                  </TouchableOpacity>
                </View>
                <View style={Styles.flexRow}>
                  <View>
                    <Label align='right'>{product.name}</Label>
                    <Label size='small' align='right'>{product.price}</Label>
                  </View>
                  <TouchableOpacity onPress={() => this.setState({visibleDetails: true, tempId: product.id})}>
                    <Image source={placeHolder} style={Styles.image} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </View>
        {visibleDetails &&
          <Details
            id={tempId}
            visible={visibleDetails}
            onClose={() => {
              this.setState({visibleDetails: false})
              this.fetchData()
            }}
            onDecrement={() => this.decrement(tempId)}
            onIncrement={() => this.increment(tempId)}
          />
        }
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  rowProduct: {
    marginBottom: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.white40,
    paddingBottom: 8
  },
  itemProduct: {
    backgroundColor: colors.purple,
    padding: 6,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mb_32: {
    marginBottom: 32
  },
  image: {
    width: 64, height: 64,
    borderRadius: 8,
    marginLeft: 8
  }
});
