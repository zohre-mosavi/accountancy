import {PureComponent, ReactNode, createRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const placeHolder = require('../../assets/images/images.png');

import {colors} from '../../assets';
import { IProps, IState } from './Details.models';
import { fakeData } from '../../constances/FakeData';
import Label from '../../components/common/Label/Label';

export default class Details extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      product: {id: -1, name: '', price: '', totalCount: 0}
    };
  }

  componentDidMount(): void {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('products');
      this.setState({products: data != null ? JSON.parse(data) : fakeData})
      let current = this.state.products.filter(product => product.id == this.props.id)[0]
      this.setState({product: current})
    } catch {}
  }

  increment = () => {
    let tempProduct = this.state.products;
    tempProduct[this.props.id].totalCount = tempProduct[this.props.id].totalCount + 1;
    this.setState({product: tempProduct[this.props.id]})
    this.forceUpdate()
    AsyncStorage.setItem('products', JSON.stringify(tempProduct))
  }

  decrement = () => {
    let tempProduct = this.state.products;
    if(tempProduct[this.props.id].totalCount > 0)
      tempProduct[this.props.id].totalCount = tempProduct[this.props.id].totalCount - 1;
    else return
    this.setState({product: tempProduct[this.props.id]})
    this.forceUpdate()
    AsyncStorage.setItem('products', JSON.stringify(tempProduct))
  }

  render(): ReactNode {
    let {product} = this.state;
    let {visible, onClose, id} = this.props;

    return (
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}>
        <ScrollView style={{flex: 1, backgroundColor: colors.white100, padding: 24}}>
          <Image source={placeHolder} style={Styles.image} />
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[Styles.flexRow, {width: '25%', justifyContent: 'space-between'}]}>
                <TouchableOpacity onPress={() => this.decrement()} style={[Styles.itemProduct, {borderRadius: 25}]}>
                    <Icon name='minus' size={18} color={colors.black} />
                </TouchableOpacity>
                <Label>{product.totalCount}</Label>
                <TouchableOpacity onPress={() => this.increment()} style={[Styles.itemProduct, {borderRadius: 25}]}>
                    <Icon name='plus' size={18} color={colors.black} />
                </TouchableOpacity>
            </View>
            <View>
                <Label align='right'>{product.name}</Label>
                <Label size='small' align='right'>{product.price}</Label>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={Styles.btn}>
            <Label>بستن</Label>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    flex: 1,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 24,
  },
  image: {
    width: 132,
    height: 132,
    borderRadius: 16,
    display: 'flex',
    alignSelf: 'flex-end',
    marginBottom: 24
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemProduct: {
    backgroundColor: colors.purple,
    padding: 6,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 24
  }
});
