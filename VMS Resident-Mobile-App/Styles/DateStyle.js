import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 0,
    paddingTop: 10,
  },
  input: {
    height: 50,
    width: 200,
    borderColor: "#94b8c7",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputStyle: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#404744",
    backgroundColor: "#e9f0f0",
  },
  addButton: {
    borderRadius: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
    height: 50,
  },
  sendButton: {
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 100,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e8e71",
    height: 50,
  },
  editIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    right: 2,
    margin: 20,
  },
  backIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    left: 2,
    margin: 15,
  },
});

export default styles;
