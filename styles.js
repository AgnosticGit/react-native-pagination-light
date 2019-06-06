import {StyleSheet} from "react-native";

let styles = StyleSheet.create(
    {
        main:
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '3.5%',
                marginRight: '3.5%',
                marginTop: 50,
            },

        move:
            {
                width: 60,
                height: 30,
                backgroundColor: 'white',
                borderRadius: 8,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            },

        pages:
            {
                width: 40,
                height: 30,
                borderRadius: 8,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            },

        colorText:
            {
                color: '#ff7f02',
            },

        dots:
            {
                paddingTop: 6,
            }

    }
);
