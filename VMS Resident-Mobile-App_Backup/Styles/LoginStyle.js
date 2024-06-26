import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    height: 180,
    width: 260,
    marginTop: 70,
    marginBottom: -20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,

    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: "#00425F",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: "#00425F",
    marginBottom: 8,
  },
  loginContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#00425F",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 15,
  },
  button: {
    alignItems: "center",
    marginTop: -20,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inBut: {
    width: "70%",
    backgroundColor: "#00425F",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    backgroundColor: "#00425F",
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smallIcon2: {
    fontSize: 40,
  },
  bottomText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  inputStyle: {
    height: 60,
    width: 370,
    borderColor: "#94b8c7",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 5,
    justifyContent: "space-between",
    marginBottom: 16,
    marginLeft: 21,
    marginTop: -17,
    paddingHorizontal: 15,
    borderColor: "#00425F",
  },
});
export default styles;
