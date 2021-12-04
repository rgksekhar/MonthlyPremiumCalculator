import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { name: '', errMsg: false, forecasts: [], loading: true, occupations: [], premiumAmount: 0.00, age: '', occupation: '', sumInsured: '', ageError: false, dob:'' }

        this.initialState = this.state;

        this.CalculatePremium = this.CalculatePremium.bind(this);
    }
    componentDidMount() {
        this.populateOccupationsData();

    }

    CalculatePremium = async event => {
        const { name, errMsg, forecasts, loading, occupations, premiumAmount, age, occupation,
            sumInsured, ageError } = this.state;
        let formErrors = {};
        let formIsValid = true;
        var ageValue = parseInt(this.state.age);
        var sumInsureda = parseInt(this.state.sumInsured);
        //const[age, sumInsured] = this.state;
        if (event.target.value === "Select") {
            return;
        }


        if (ageValue > 100 || this.state.age === "" || this.state.name == "" || this.state.dob == "" || this.state.sumInsured == "") {

            this.setState({ errMsq: true });
            ageValue > 100 ? this.setState({ ageError: true }) : this.setState({ ageError: false });
            formIsValid = false;
        }
        var req = {
            age: ageValue,
            sumInsured: sumInsureda,
            occupation: event.target.value
        }
        //alert (this.state.errMsg) ;
        // alert ("eeee"

        //event.target.value +JSON.stringify (req) ) i
        const requestoptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        };

        if (formIsValid === true) {
            var response = await fetch('api/premiumcalculator', requestoptions);
            console.log(response);
            const data = await response.json();
            console.log(data.toFixed(2));
            this.setState({ premiumAmount: data.toFixed(2), loading: false });
        }
    }
    ageHandler = event => {
        if (event <= 100 && event >= 0) {
            return true;
        }
        else {
            this.setState({ ageError: true });
            return false;
        }
    };

    handleChangeselect = selectedoption => {
        this.setState({ factor: selectedoption.target.value });
        console.log('Option selected:', selectedoption.target.value);
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <label className={"labelDiv"}>
                            Name <span className="mandatory" >*
                            </span >
                        </label></div>
                    <div className="col-sm-4" >
                        <input className="inputDiv" type="text" name="name" min="O" max="100000"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.name} />
                        {
                            this.state.name.length < 1 && this.state.errMsg ?
                                (
                                    <div className="mandatory" >
                                        { "Please enter name"}
                                    </div >
                                ) : null
                        }

                    </div >
                </div >
                <div className="row pt-2" >
                    <div className="col-sm-4" >
                        <label>
                            Age<span className="mandatory">*
                            </ span>

                        </label></div >

                    <div className="col-sm-4" >
                        <input
                            className="inputDiv"
                            type="text"
                            name="age"
                            type="number" maxLength="3"

                            onKeyPress={(e) => this.ageHandler(e.target.value)}
                            onChange={(e) => this.handleChange(e)}  value={this.state.age} />

                        {
                            this.state.age.length < 1 && this.state.errMsg ?

                                (<div className="mandatory">Please enter age</div>) : this.state.ageError &&

                                    (parseInt(this.state.age) > 100
                                        ||
                                        parseInt(this.state.age) < 0) ?

                                    <div className="mandatory" > Please enter your age between 0 and 100.
                                    </div > : null
                        } </div >


                </div>
                <div className="row pt-2" >
                    <div className="col-sm-4" >
                        <label className={"labelDiv"}>

                            Date <span className="mandatory" >*
                            </span>
                        </label ></div >

                    <div
                        className="col-sm-4">

                        <input
                            min="O"
                            className="inputDiv"
                            name="dob"
                            type="date"
                            max="100000"
                            onChange={(e) => this.handleChange(e)}
                            required 
                            value={this.state.dob}
                        />
                        {
                            this.state.dob.length < 1 && this.state.errMsg ?

                                (<div className="mandatory">Please enter DOB</div>):null
                        }
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-sm-4" >
                        <label className={"labelDiv"}>
                            Sum Insured <span className="mandatory">*
                            </span>

                        </label></div >
                    <div className="col-sm-4" >
                        <input className="inputDiv" name="sumInsured"
                            type="number"
                            onChange={(e) => this.handleChange(e)} value = {this.state.sumInsured}
                            min="O" max="100000" />
                        {
                            parseInt((this.state.sumInsured) < 0) && this.state.errMsg ?

                                (<div className="mandatory">Please enter Sum Insured</div>) : null
                        }
                    </div >

                </div >
                <div className="row pt-2" >
                    <div className="col-sm-4"> <label>
                        Occupation <span className="mandatory">* </span>
                    </label ></div >
                    <div className="col-sm-4" >
                        <div>
                            <select
                                className="inputDiv"
                                name="list"
                                id="list" onChange={this.CalculatePremium}>
                                {
                                        this.state.occupations.map((value, index) => (
                                        <option key={index} value={value} >
                                            {value}
                                        </option>))}
                            </select>
                        </div >
                    </div >
                </div>
                <div className="row pt-2" >
                    <div className="col-sm-4" >
                        Total Premium amount
                    </div>

                    <div className="col-sm-4">
                        <span className="inputDiv" >
                            ${this.state.premiumAmount} </span>
                    </div>
                </div >
            </div>
        );
    }

    async populateOccupationsData() {
        const response = await fetch('api/occupation');
        const data = await response.json();
        this.setState({ occupations: data, loading: false });
    }
}