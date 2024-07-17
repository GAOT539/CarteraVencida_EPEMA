import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
  },
  notification: {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
  },
  reportNumber: {
    fontFamily: 'Microsoft JhengHei',
    fontSize: 12,
    color: 'red',
    textAlign: 'right',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
