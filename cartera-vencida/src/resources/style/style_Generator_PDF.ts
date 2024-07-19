import { StyleSheet } from "@react-pdf/renderer";
import colors from "../style/colors";

const styles = StyleSheet.create({
  page: {
    paddingTop: 28.35,
    paddingRight: 30,
    paddingBottom: 28.35,
    paddingLeft: 30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  logo: {
    width: 75,
    height: 75,
    marginRight: 10
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text_Black,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontWeight: "bold"
  },
  notification: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: colors.text_White,
    backgroundColor: colors.text_EerieBlack,
    padding: 4,
    borderRadius: 2,
    fontWeight: "bold"
  },
  reportNumber: {
    fontFamily: "Roboto",
    fontSize: 14
  },
  reportNumber_N: {
    color: colors.text_Red
  },
  section01: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginBottom: 10
  },
  section02: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 10
  },
  texts: {
    fontFamily: "Roboto",
    fontSize: 10,
    flexGrow: 1,
    textAlign: 'justify'
  },
  texts_Black: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 10,
    flex: 1
  },
});

export default styles;