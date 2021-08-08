import { StyleSheet } from "react-native"
import Colors from "../../res/Colors";

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      scrollView: {
        flex: 1,
      },
      layerColor: {
        flex: 2,
        width: '100%',
        backgroundColor: '#3a404935',
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      form: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '80%',
        backgroundColor: '#1D9B9F',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.white,
      },
      scrollForm: {
        marginVertical: 120,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#1D9B9F',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.white,
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: Colors.white,
      },
      formText: {
        color: Colors.white,
      },
      formgroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '80%',
      },
      input: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.white,
      },
      inputText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        color: Colors.white,
      },
      inputPassword: {
        width: '85%',
        paddingVertical: 5,
        paddingHorizontal: 12,
      },
      password: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.white,
      },
      submit: {
        marginVertical: 35,
        width: '35%',
        borderWidth: 1,
        borderColor: '#1B8286',
        borderRadius: 10,
        backgroundColor: '#146AA1',
      },
      submitText: {
        fontSize: 16,
        marginHorizontal: 15,
        marginVertical: 10,
        color: Colors.white,
        textAlign: 'center',
      },
      errorContainer: {
        marginVertical: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FF353C40',
        borderRadius: 5,
      },
      errorMsg: {
        color: '#990009',
      },
      signUpTouchable: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
      },
      signUpBoldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
      },
});



export default style;