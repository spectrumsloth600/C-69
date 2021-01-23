import React from 'react';
import {Text,View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component {
    constructor(){
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData:'',
            buttonState:'normal'
        
        }
    }
    getCameraPermissions = async()=>{
        const{status}=await Permissions.askAsync(Permission.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:'clicked',
            scanned:false
        });
    }
    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }

    render(){
        
const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned =this.state.scanned;
const buttonState = this.state.buttonState;

            if(buttonState=="clicked" && hasCameraPermissions){
                return(
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                    style = {StyleSheet.absolouteFinObject}
                    />
                );

            }
            else if(buttonStaate=='normal'){
                return(
                    <View style={styles.container}>
                        <Text style={styles.displayText}>{hasCameraPermissions===true ? this.state.scannedData:"request camera permission"}</Text>
                    <TouchableOpactity
                    onPress = {this.getCameraPermissions}
                    style={styles.scanButton}>
                        <Text style={style.buttonText}> SCAN QR CODE </Text>
                    </TouchableOpactity>
                     </View>



                

            }
           
        );
    
    }
}