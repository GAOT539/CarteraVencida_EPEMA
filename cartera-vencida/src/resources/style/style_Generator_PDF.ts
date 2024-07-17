import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  notification: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold'
  },
  reportNumber: {
    fontFamily: 'Noto Sans TC',
    fontSize: 12,
    color: 'red'
  }
});

export default styles;
