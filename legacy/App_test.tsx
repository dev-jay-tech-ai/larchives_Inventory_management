import './App.css';
import useGoogleSheet from './lib/googlesheet';

const App = () => {
  const [ data ] = useGoogleSheet('2019115742');
  const list = ['품목코드','품명','컬러','사이즈','구매가격(￡)','수량','판매제품링크 (사이트)'];

  return (
      <div>
        <table>
          <thead>
          <th>품목코드</th>
          <th>품명</th>
          <th>컬러</th>
          <th>사이즈</th>
          <th>구매가격(￡)</th>
          <th>수량</th>
          <th>판매제품링크 (사이트)</th>
          </thead>
          <tbody>
          {data.map((row) => {
          return (<tr>
            <td>{row[list[0]]}</td>
            <td>{row[list[1]]}</td>
            <td>{row[list[2]]}</td>
            <td>{row[list[3]]}</td>
            <td>{row[list[4]]}</td>
            <td>{row[list[5]]}</td>
            <td>{row[list[6]]}</td>
          </tr>)
          })
        }
      </tbody>
    </table>
    </div>);
}

export default App;
