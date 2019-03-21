import React from 'react';
import { Row, Col, Table} from 'reactstrap';


const Weather = (props) => {
    const { data } = props;

    if (!data)
        return  <div></div>;
    return (
        <Row className="weather">
             <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h4 className="city-name">{data.name}</h4>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon"/>
                <span>{data.weather[0].main} - {data.weather[0].description}</span>&nbsp;
                <span>{Math.floor(data.main.temp)}&deg;F</span>
                <Table>
                    <tbody>
                        <tr>
                            <td>Min Temp</td>
                            <td>{Math.floor(data.main.temp_min)}&deg;F</td>
                        </tr>
                        <tr>
                            <td>Max Temp</td>
                            <td>{Math.floor(data.main.temp_max)}&deg;F</td>
                        </tr>
                        <tr>
                            <td>Wind</td>
                            <td>{Math.floor(data.wind.speed)} km/h</td>
                        </tr>

                        <tr>
                            <td>Humidity</td>
                            <td>{Math.floor(data.main.humidity)}%</td>
                        </tr>

                    </tbody>
                </Table>
            </Col>
        </Row>
     );
};
// const mapStateToProps = state => {
//     return {weatherInfo: state.weatherInfo }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         onWeatherStore: (weatherInfo) => dispatch(actions.weatherStore(weatherInfo))
//     }
// }
// export default connect(null,mapDispatchToProps)(Weather);
export default Weather;