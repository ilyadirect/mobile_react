import React from 'react';
import MyDispatcher from '../MyDispatcher';
import Http from '../helpers/Http';

export default class DeviceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }


    componentWillMount() {
        Http.get({
            url: '/devices/' + this.props.params.id,
            success: (data) => {
                MyDispatcher.dispatch({
                    'type': 'CHANGE_BREADCRUMB',
                    'name': 'deviceView',
                    'properties': {
                        id: this.props.id,
                        name: data.name,
                    }
                });
                this.setState({
                    loaded: true,
                    device: data,
                });


            }
        }, this)
    }

    render() {

        // Query params
        // console.log(this.props.location.query);
        console.log(this.props);
        return !this.state.loaded ?
            (<p>Loading... <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></p>)
            : (
                <div className="device-view">
                    <h1>{ this.state.device.name }</h1>
                    <p>
                        <a className="btn btn-primary" href="/content/device/update?id=34">Редактировать</a>
                        <a
                        className="btn btn-danger" href="/content/device/delete?id=34"
                        data-confirm="Вы действительно хотите удалить устройство?" data-method="post">Удалить</a>
                    </p>

                    <table id="w0" className="table table-striped table-bordered detail-view">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{ this.state.device.id }</td>
                        </tr>
                        <tr>
                            <th>Название</th>
                            <td>{ this.state.device.name }</td>
                        </tr>
                        <tr>
                            <th>Alias</th>
                            <td>{ this.state.device.alias }</td>
                        </tr>
                        <tr>
                            <th>Изображение</th>
                            <td><img src={this.state.device.image_url} alt={this.state.device.alias }/></td>
                        </tr>
                        <tr>
                            <th>Описание</th>
                            <td>{ this.state.device.description }</td>
                        </tr>
                        <tr>
                            <th>Название категории</th>
                            <td>{ this.state.device.deviceCategory? this.state.device.deviceCategory.name : '-'  }</td>
                        </tr>
                        <tr>
                            <th>Активен</th>
                            <td>{ this.state.device.enabled }</td>
                        </tr>
                        <tr>
                            <th>Название производителя</th>
                            <td>{ this.state.device.vendor? this.state.device.vendor.name : '-'  }</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );

    }
}