import React from 'react'
import { 
    View, 
    Text,
    FlatList, 
    StyleSheet, 
    ActivityIndicator, 
    StatusBar,
 } from 'react-native'
import Storage from '../../libs/storage';
import Loader from '../../Generics/Loader';
import exampleStyles from '../../styles/example'
import BadgesItem from '../BadgesScreen/BadgesItem';

class Favorites extends React.Component{
    state = {
        loading: false,
        badges: undefined,
    }

    //It makes a component out of favourites focused.
    componentDidMount = () => {
        this.getFavorites();
        this.focusEvent();
    }

    //It will get the badges if they are considered favourites.
    getFavorites = async () => {
        this.setState({loading: true, badges: undefined});
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter(key => key.includes('favorite-'));
            const favs = await Storage.instance.multiGet(keys);
            const favorites = favs.map( fav => JSON.parse(fav[1]));
            this.setState({loading: false, badges: favorites});
        } catch (err) {
            console.log('get favorites err', err);
        }
    }

    //It will send the user to the details of the favourite badges.
    handlePress = item => {
        this.props.navigation.navigate('FavoritesDetails', {item});
    };

    //It makes a screen come into focus.
    focusEvent = () => {
        this.focusEvent = this.props.navigation.addListener('focus', () => {
            this.getFavorites();
        });
    };

    //This one gets rid of the focus when used already.
    componentWillUnmount = () => {
        this.focusListener();
    };

    render(){
        const {badges, loading} = this.state;

        if(loading == true && !badges){
            <Loader />;
        }

        return(
            <View style={[styles.favoritesContainer, exampleStyles.container, exampleStyles.horizontal]}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <FlatList 
                    style={styles.list}
                    data={badges}
                    renderItem={({item}) => (
                        <BadgesItem item={item} onPress={() => this.handlePress(item)} />
                    )} 
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    favoritesContainer:{
        paddingTop: 45,
    },
    list:{
        width: '100%',
        paddingHorizontal: 10,
    },
});

export default Favorites;