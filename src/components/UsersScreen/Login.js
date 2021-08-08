import React from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import Colors from '../../res/Colors'
import Loader from '../../Generics/Loader'
import styles from './styles'
import UserSession from '../../libs/sessions';

const imageBackground = {
    uri: 'https://images.pexels.com/photos/4913371/pexels-photo-4913371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

class Login extends React.Component {

    state = {
        loading: false,
        error: null,
        user: undefined,
        isPasswordVisible: true,
        form: {},
    };

    componentDidMount = () => {
        this.deleteTokens();
    };

    //It deletes the tokes once the user logs out.
    deleteTokens = async () => {
        await UserSession.instance.logout();
    };

    //It checks if the username and passwors are correct
    //or if the user is verified
    handleSubmit = async () => {
        try {
            this.setState({ loading: true, error: null, user: undefined });
            let response = await UserSession.instance.login(this.state.form);
            if (typeof response == 'object') {
                console.log(response);
                if (response['405']) {
                    var message = 'Account is not verified';
                } else {
                    var message = 'Invalid Username or Password. please try again.';
                }
                this.setState({ loading: false, error: message, user: undefined });
            } else {
                this.setState({ loading: false, error: null, user: response });
            }
        } catch (err) {
            this.setState({ loading: false, error: err });
        }
        if (this.state.user) {
            this.props.navigation.replace('BadgesTabNavigator');
        }
    };

    //It makes the password visible depending on the state of the button.
    toggleIsPasswordVisible = () => {
        if (this.state.isPasswordVisible) {
            this.setState({ isPasswordVisible: false });
        } else {
            this.setState({ isPasswordVisible: true });
        }
    };

    //It sends the user to the signup form
    handleSignUp = async () => {
        this.props.navigation.navigate("Signup");
    }

    render() {
        const {isPasswordVisible, loading, error} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Login</Text>
                            {error ? (
                                <View style={styles.errorContainer}>
                                <Text style={styles.errorMsg}>{error}</Text>
                                </View>
                            ) : null}
                            <View style={styles.formgroup}>
                                <Text style={styles.inputText}>Username</Text>
                                <TextInput
                                style={styles.input}
                                placeholder={'Username'}
                                keyboardAppearance="dark"
                                onChangeText={text => {
                                    this.setState(prevState => {
                                    let form = Object.assign({}, prevState.form);
                                    form.username = text;
                                    return {form};
                                    });
                                }}
                                />
                                <Text style={styles.inputText}>Password</Text>
                                <View style={styles.password}>
                                <TextInput
                                    style={styles.inputPassword}
                                    secureTextEntry={isPasswordVisible}
                                    placeholder={'Password'}
                                    keyboardAppearance="dark"
                                    onChangeText={text => {
                                    this.setState(prevState => {
                                        let form = Object.assign({}, prevState.form);
                                        form.password = text;
                                        return {form};
                                    });
                                    }}
                                />
                                <TouchableOpacity onPress={this.toggleIsPasswordVisible}>
                                    <Image
                                    style={{marginRight: 10}}
                                    source={
                                        isPasswordVisible
                                        ? require('../../assets/show.png')
                                        : require('../../assets/hide.png')
                                    }
                                    />
                                </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.submit}
                                onPress={this.handleSubmit}>
                                <Text style={styles.submitText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.signUpTouchable}
                                onPress={this.handleSignUp}>
                                <Text>{'There is no account. '}</Text>
                                <Text style={styles.signUpBoldText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}


export default Login;