import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
} from 'react-native'
import Colors from '../../res/Colors'
import Loader from '../../Generics/Loader';
import UserSession from '../../libs/sessions';
import styles from './styles'

const imageBackground = {
    uri: 'https://images.pexels.com/photos/4913371/pexels-photo-4913371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

class Signup extends React.Component {
    state = {
        loading: false,
        errors: [],
        user: undefined,
        IsPasswordVisible: true,
        isPasswordConfVisible: true,
        form: {},
    };

    //It creates a new user using the post method to do so.
    handleSubmit = async () => {
        try {
            this.setState({ loading: true, user: undefined });
            let response = await UserSession.instance.signup(this.state.form);
            if (typeof response == 'object') {
                let errors = [];
                let cont = 0;

                for (let error in response) {
                    let key = error;
                    if (error == 'non_field_errors') {
                        error = 'password';
                    }

                    errors.push(
                        <View key={cont}>
                            <Text>{`${error} : ${response[key][0]}`}</Text>
                        </View>,
                    );
                    cont++;
                }
                this.setState({ 
                    loading: false, 
                    user: undefined,
                    errors: errors,
                });
            } else {
                this.setState({
                    loading: false,
                    user: response,
                    errors: [],
                });
                if (this.state.user) {
                    this.props.navigation.navigate('Login');
                }
            }
        } catch (err) {
            console.log('Sign up err', err);
            throw Error(err);
        }
    };

    //It makes the password visible depending on the state of the button.
    ToggleIsPasswordVisible = () => {
        if (this.state.IsPasswordVisible) {
            this.setState({ IsPasswordVisible: false });
        } else {
            this.setState({ IsPasswordVisible: true });
        }
    };

    //It makes the password confirmation visible depending on the state of the button.
    ToggleIsPasswordConfVisible = () => {
        if (this.state.isPasswordConfVisible) {
            this.setState({ isPasswordConfVisible: false });
        } else {
            this.setState({ isPasswordConfVisible: true });
        }
    };

    render() {
        const { IsPasswordVisible, isPasswordConfVisible, loading, errors } = this.state;
        if (loading == true) {
            <Loader />
        }
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="transparent" translucent={true} />
                    <ImageBackground source={imageBackground} style={styles.image}>
                        <View style={styles.layerColor}>
                            <View style={styles.scrollForm}>
                                <Text style={styles.title}>Signup</Text>
                                {errors ? (
                                    <View style={styles.errorContainer}>{errors}</View>
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
                                    <Text style={styles.inputText}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Email'}
                                        keyboardAppearance="dark"
                                        keyboardType="email-address"
                                        onChangeText={text => {
                                        this.setState(prevState => {
                                            let form = Object.assign({}, prevState.form);
                                            form.email = text;
                                            return {form};
                                        });
                                        }}
                                    />
                                    <Text style={styles.inputText}>Password</Text>
                                    <View style={styles.password}>
                                        <TextInput
                                            style={styles.inputPassword}
                                            secureTextEntry={IsPasswordVisible}
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
                                        <TouchableOpacity onPress={this.ToggleIsPasswordVisible}>
                                            <Image
                                                style={{marginRight: 10}}
                                                source={
                                                IsPasswordVisible
                                                    ? require('../../assets/show.png')
                                                    : require('../../assets/hide.png')
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.inputText}>Password confirmation</Text>
                                    <View style={styles.password}>
                                        <TextInput
                                            style={styles.inputPassword}
                                            secureTextEntry={isPasswordConfVisible}
                                            placeholder={'Password confirmation'}
                                            keyboardAppearance="dark"
                                            onChangeText={text => {
                                                this.setState(prevState => {
                                                let form = Object.assign({}, prevState.form);
                                                form.password_confirmation = text;
                                                return {form};
                                                });
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={this.ToggleIsPasswordConfVisible}>
                                            <Image
                                                style={{marginRight: 10}}
                                                source={
                                                isPasswordConfVisible
                                                    ? require('../../assets/show.png')
                                                    : require('../../assets/hide.png')
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={[styles.submit, {marginVertical: 50}]}
                                    onPress={this.handleSubmit}>
                                    <Text style={styles.submitText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        );
    }
}

export default Signup;