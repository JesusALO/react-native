import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UserSession from '../../libs/sessions';
import Colors from '../../res/Colors';

class Profile extends React.Component {

    state = {
        user: {
            profile: {},
        },
        token: '',
        picture: '',
    }

    //It makes a componet of the user information.
    componentDidMount = () => {
        this.getUserData();
    };

    //It makes a request for the user information and token.
    getUserData = async () => {
        let user = await UserSession.instance.getUser();
        let token = await UserSession.instance.getToken(user.username);
        this.setState({ user: user, token: token });
    };
    //Blob -> Binary large object
    handleChooseProfileImage = () => {
        const options = {
            includeBase64: false,
            mediaType: 'photo',
        };
        //It allows to choose a picture from the library.
        launchImageLibrary(options, response => {
            if(!response.didCancel){
            let photo = response.assets[0].uri;
            this.setState({ picture: photo });
            this.editProfilePicture();
            }
        });
    };

    //It gets rid of the old picture and sets the new one.
    editProfilePicture = async () => {
        const { user, token, picture } = this.state;
        let response = await UserSession.instance.editProfile(
            user.id,
            token,
            picture,
        );
        console.log(response);
        this.setState({user: response}); 
    };

    render() {
        const { user, picture } = this.state;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.header}
                    source={{ uri: `${user.profile.header_img}` }}
                />
                <Image
                    style={styles.profileImage}
                    source={{ uri: picture || `${user.profile.profile_picture}` }}
                />
                <TouchableOpacity
                    style={styles.profileEdit}
                    onPress={this.handleChooseProfileImage}
                >
                    <Image
                        style={styles.camera}
                        source={require('../../assets/edit_icon.png')}
                    />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.age}>{user.profile.age}</Text>
                </View>
                <Text style={styles.city}>{user.profile.city}</Text>
                <View style={styles.data}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '40%',
        backgroundColor: Colors.zircon,
    },
    profileImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.white,
        position: 'absolute',
        top: 170,
        left: '23%',
    },
    profileEdit: {
        width: 35,
        height: 35,
        padding: 5,
        borderRadius: 20,
        borderWidth: 5,
        backgroundColor: Colors.zircon,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 330,
        left: 230,
    },
    camera: {
        flex: 2,
        width: '100%',
        height: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 100,
        justifyContent: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.zircon,
    },
    age: {
        fontSize: 28,
        marginLeft: 10,
        color: Colors.zircon,
    },
    city: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: Colors.zircon,
    },
    data: {
        padding: 20,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

export default Profile;