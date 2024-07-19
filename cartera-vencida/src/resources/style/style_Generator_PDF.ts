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
    fontSize: 16,
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
  texts: {
    fontFamily: "Roboto",
    fontSize: 10,
    flexGrow: 1,
    textAlign: 'justify',
  },
  texts_Blod: {    
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: colors.text_Red,
    textTransform: "uppercase"
  },
  texts_Italic:{
    fontFamily: "Roboto",
    fontStyle: 'italic',
    fontSize: 10,
    textAlign: 'justify',
  },
  section01: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5
  },
  section02: {
    alignItems: 'center',
    marginBottom: 5
  },
  section03: {
    alignItems: 'flex-start',
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section04: {
    alignItems: 'center',
    marginBottom: 1
  },
  section05: {
    alignItems: 'center',
    marginBottom: 1
  }, 
  section06: {
    alignItems: 'center',
    marginBottom: 1
  }, 
  roundedSquare: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.text_Black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
  },
  table: {
    width: 275,
    borderWidth: 0.4,
    borderColor: colors.text_Black,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderWidth: 0.4,
    borderColor: colors.text_Black,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  notificationTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  notificationText: {
    fontSize: 10,
    marginBottom: 5,
  },

  table2: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 5,
  },
  table2Row: {
    flexDirection: 'row',
  },
  table2Col: {
    width: '14.28%',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table2Cell: {
    fontSize: 8,
    textAlign: 'center',
  }
});

export default styles;