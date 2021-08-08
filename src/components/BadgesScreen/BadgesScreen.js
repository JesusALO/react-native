import React from 'react'
import { 
    View, 
    ActivityIndicator, 
    StyleSheet, 
    FlatList,
    StatusBar,
    Text,
    Alert,
    TouchableOpacityBase,
} from 'react-native'
import BadgesItem from './BadgesItem'
import Loader from '../../Generics/Loader'
import Storage from '../../libs/storage'
import Colors from '../../res/Colors'
import Http from '../../libs/http'
import BadgesSearch from './BadgesSearch'

class BadgesScreen extends React.Component{
    state = {
        loading: false,
        badges: undefined,
        badgesCopy: undefined,
    }

    //It makes an object with the information of the requests.
    componentDidMount(){
        this.fetchdata();
        this.focusEvent();
        this.blurEvent();
    }

    //It makes a screen come into focus.
    focusEvent = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setFetchInterval();
        });
    };

    //It makes a screen come out of focus.
    blurEvent = () => {
        this.blurListener = this.props.navigation.addListener('blur', () => {
            clearInterval(this.interval);
        });
    };

    //It decides the interval between the blur and the focus.
    setFetchInterval = () => {
        this.interval = setInterval(this.fetchdata, 3000);
    };

    //It makes a request of all the existen badges.
    fetchdata = async() => {
        console.log('Fetching data');
        this.setState({loading: true});
        let response = await Http.instance.get_all();
        this.setState({loading: false, badges: response, badgesCopy: response});
    };

    //It sends the user to the details of the badge.
    handlePress = item => {
        this.props.navigation.navigate('BadgesDetail', {item});
    };

    //It sends the user where the details of the badge can be changed.
    handleEdit = item => {
        console.log(this.props.navigation);
        this.props.navigation.navigate('BadgesEdit', {item});
    };

    //It filters the information of the badges. 
    handleChange = query => {
        const {badgesCopy} = this.state;
        
        const badgesFiltered = badgesCopy.filter( badge => {
            return badge.name.toLowerCase().includes(query.toLowerCase());
        });
        this.setState({badges: badgesFiltered});
    
        if(query){
            clearInterval(this.interval);
        } else {
            this.setFetchInterval();
        }
    };

    //It can delete a badge, but not whitout sending a message of confirmation.
    handleDelete =  item => {
        Alert.alert(
            'Are you sure?',
            `Do you really want to delete ${item.name}'s badge?\n\nThis process cannot be undone`,
            [
                {
                    text: 'Cancel',
                    style:'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        this.setState({loading: true, badges: undefined});
                        await Http.instance.remove(item._id);
                        let key = `favorite-${item._id}`;
                        await Storage.instance.remove(key);
                        this.fetchdata();
                    },
                    style: 'destructive',
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    //This one gets rid of the blur and focus when used already.
    componentWillUnmount() {
        this.focusListener();
        this.blurListener();
    }

    render(){
        const {badges, loading} = this.state;
        if(loading == true && !badges){
            return <Loader />;
        }
        return(
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <BadgesSearch onChange={this.handleChange} />
                <FlatList 
                style={styles.list} 
                data={badges} 
                renderItem={({item}) => (
                    <BadgesItem 
                        item={item} 
                        onPress={() => this.handlePress(item)} 
                        onEdit={()=>this.handleEdit(item)}
                        onDelete={()=>this.handleDelete(item)}
                    />
                )}
                keyExtractor = {(item, index) => index.toString()}
                />  
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.charade,
    },
    horizontal:{
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loader:{
        height: '100%',
        paddingHorizontal: 10,
    },
    list:{
        width: '100%',
        paddingHorizontal: 10,
    },
});

export default BadgesScreen;