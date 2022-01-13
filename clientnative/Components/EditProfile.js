import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();

  ////--> IMAGE PICKER <-- ////
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere el permiso para acceder a la cámara");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  //// --> Inicio de componente <-- ////
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity
            //no esta conectado a ningun lugar
            onPress={() => navigation.navigate("ProfileUserScreen")}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
          Editar perfil
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage.localUri
                  : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
            }}
            style={styles.imgPerfil}
          />

          <View>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("./add-photo.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* INICIO DEL FORMULARIO */}
        <View style={styles.containerInputs}>
          <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
            Datos personales
          </Text>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
              placeholder="Nombre"
              name="name"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
              placeholder="Apellido"
              name="lastname"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="reader-outline" size={26} />
            <TextInput
              placeholder="Documento de identidad"
              name="documentID"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="phone-portrait-outline" size={26} />
            <TextInput
              placeholder="Celular válido"
              name="phone"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="map-outline" size={26} />
            <TextInput
              placeholder="Lugar de residencia actual"
              name="location"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="card-outline" size={26} />
            <TextInput
              placeholder="Medio de pago válido"
              name="CBU"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.btn2}>
            <TouchableOpacity
              style={styles.btnEditar}
              ///---> PONER A DONDE TIENE QUE VOLVER <--- ///
              onPress={() => navigation.navigate("ProfileUserScreen")}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnEditar}>
              <Text style={styles.textBtn}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },

  imgPerfil: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: "#FFC107",
    borderWidth: 5,
    marginTop: 40,
  },
  imgAdd: {
    width: 50,
    height: 50,
    marginLeft: 135,
    marginTop: -70,
    borderWidth: 3,
    borderColor: "#511281",
    borderRadius: 50,
  },
  viewsInputs: {
    margin: 2,
    borderColor: "#511281",
    borderBottomWidth: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 15,
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 2,
  },
  btnEditar: {
    backgroundColor: "#7952B3",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 30,
  },

  textBtn: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    marginTop: 12,
  },

  btn2: { flexDirection: "row", marginLeft: 20 },
});

export default EditProfile;
