import React, { Component } from 'react';
import { Inject, ScheduleComponent, Day, Week, Month, Agenda } from "@syncfusion/ej2-react-schedule";

class Schedule extends Component {

    render() {
        return <ScheduleComponent currentView='Month'>
            <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
    }
}

export default Schedule;