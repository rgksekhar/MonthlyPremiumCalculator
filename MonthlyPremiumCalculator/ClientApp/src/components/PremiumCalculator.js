import React, { Component } from 'react';

export class PremiumCalculator extends Component {
    static displayName = PremiumCalculator.name;

    constructor(props) {
        super(props);
        this.state = { name: '', errMsg: false, forecasts: [], loading: true, occupations: [], premiumAmount: 0.00, age: '', occupation: '', sumInsured: '', ageError: false, dob: '', formErrors: {} }

        this.initialState = this.state;

        this.CalculatePremium = this.CalculatePremium.bind(this);
    }

    componentDidMount() {
        this.populateOccupationsData();
    }

    CalculatePremium = async event => {
        const { name, errMsg, forecasts, loading, occupations, premiumAmount, age, occupation,
            sumInsured, ageError, dob } = this.state;

        let formErrors = {};
        let formIsValid = true;
        var ageValue = parseInt(this.state.age);
        var sumInsureda = parseInt(this.state.sumInsured);

        if (event.target.value === "Select") {
            return;
        }
        if (!name) {
            formIsValid = false;
            formErrors["nameErr"] = "Name is required.";
        }
        if (!age) {
            formIsValid = false;
            formErrors["ageErr"] = "Age is required.";
        }
        if (!dob) {
            formIsValid = false;
            formErrors["dobErr"] = "DOB is required.";
        }
        if (!sumInsured) {
            formIsValid = false;
            formErrors["sumInsuredErr"] = "Sum Insured is required.";
        }
        if (ageValue > 100) {
            formIsValid = false;
            formErrors["ageErrorMessage"] = "Please enter your age between 0 and 100";
        }
        this.setState({ premiumAmount: 0, loading: false });
        this.setState({ formErrors: formErrors });     

        if (ageValue > 100) {

            this.setState({ errMsq: true });
            ageValue > 100 ? this.setState({ ageError: true }) : this.setState({ ageError: false });
            formIsValid = false;
        }
        var req = {
            age: ageValue,
            sumInsured: sumInsureda,
            occupation: event.target.value
        }

        const requestoptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        };

        if (formIsValid === true) {
            var response = await fetch('api/premiumcalculator', requestoptions)
            const data = await response.json();
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    resetFields() {
        this.setState(this.initialState);
        this.populateOccupationsData();
    }

    render() {
        const { nameErr, ageErr, dobErr, sumInsuredErr, ageErrorMessage } = this.state.formErrors;
        return (
            <div className = "container">
                <div className = "heading"> Monthly Premium Calculator</div>
                <div className = "row">
                    <div className = "col-sm-4">
                        <label className = {"labelDiv"}>
                            Name <span className = "mandatory" >*
                            </span >
                        </label></div>
                    <div className = "col-sm-4" >
                        <input className = "inputDiv"
                            type = "text"
                            name = "name"
                            minLength = "O"
                            maxLength = "40"
                            placeholder= "Your Name.."
                            onChange = {(e) => this.handleChange(e)}
                            value = { this.state.name }
                            className = { nameErr ? 'showError' : ''} />
                        
                        {
                            nameErr &&
                            <div className = "mandatory"> { nameErr } </div>
                        }

                    </div >
                </div >
                <div className = "row pt-2" >
                    <div className = "col-sm-4" >
                        <label>
                            Age<span className = "mandatory">*
                            </ span>

                        </label></div >

                    <div className = "col-sm-4" >
                        <input
                            className = "inputDiv"
                            type = "text"
                            name = "age"
                            type = "number" maxLength = "3"
                            placeholder = "Your Age.."
                            onKeyPress = {(e) => this.ageHandler(e.target.value)}
                            onChange = {(e) => this.handleChange(e)}
                            value = {this.state.age} />

                        {
                            this.state.age.length < 1 && this.state.errMsg ?

                                (<div className = "mandatory">Please enter age</div>) : this.state.ageError &&

                                    (parseInt(this.state.age) > 100
                                        ||
                                        parseInt(this.state.age) < 0) ?

                                    <div className = "mandatory" > Please enter your age between 0 and 100.
                                    </div > : null
                        }
                        {
                            ageErr &&
                            <div className = "mandatory">{ageErr}</div>
                        }
                    </div >

                </div>
                <div className = "row pt-2" >
                    <div className = "col-sm-4" >
                        <label className = {"labelDiv"}>

                            Date <span className = "mandatory" >*
                            </span>
                        </label ></div >

                    <div className = "col-sm-4">

                        <input                           
                            className = "inputDiv"
                            name = "dob"
                            type = "date" 
                            placeholder = "Your Dob.."
                            onChange = {(e) => this.handleChange(e)}
                            required 
                            value = {this.state.dob}  />
                        
                        {
                            dobErr &&
                            <div className = "mandatory"> {dobErr} </div>
                        }
                    </div>
                </div>
                <div className = "row pt-2">
                    <div className = "col-sm-4" >
                        <label className = {"labelDiv"} >
                            Sum Insured <span className = "mandatory">*
                            </span>

                        </label></div >
                    <div className = "col-sm-4" >
                        <input className="inputDiv"
                            name="sumInsured"
                            type = "number"
                            placeholder = "Sum Insured.."
                            onChange = {(e) => this.handleChange(e)}
                            value = {this.state.sumInsured}
                            minLength = "O" maxLength = "6"  />
                        {
                            sumInsuredErr || parseInt((this.state.sumInsured) < 0) ?

                                (<div className = "mandatory">{sumInsuredErr}</div>) : null
                        }
                    </div >

                </div >
                <div className = "row pt-2" >
                    <div className = "col-sm-4"> <label>
                        Occupation <span className = "mandatory">* </span>
                    </label ></div >
                    <div className = "col-sm-4" >
                        <div>
                            <select
                                className = "inputDiv"
                                name = "list"
                                id="list"
                                onChange={this.CalculatePremium}>
                                {
                                        this.state.occupations.map((value, index) => (
                                        <option key = {index} value = {value} >
                                            {value}
                                        </option>))}
                            </select>
                        </div >
                    </div >
                </div>
                <div className = "row pt-2" >
                    <div className = "col-sm-4" >
                        Total Premium amount
                    </div>

                    <div className = "col-sm-4">
                        <span className = "inputDiv" >
                            ${this.state.premiumAmount} </span>
                    </div>
                </div >

                <div className = "row pt-2" >
                    <div className = "col-sm-4" >
                       </div>

                    <div className = "col-sm-6">
                        <input
                            className = "btn-primary"
                            type = "button"
                            value = "Reset"
                            onClick={() => { this.resetFields() }} />
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