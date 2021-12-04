import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { name:'', errMsg: false, forecasts: [], loading: true, occupations: [], premiumAmount: 0, age:'', occupation:'', sumInsured: '', ageError: false }

        this.initialstate = this.state;

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


    if (ageValue > 100 || this.state.age === "" || this.state.name == "") {

        this.setstate({ errMsq: true });
        this.setstate({ ageError: true });
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
            'Content-Type': 'application'
        },
        body: JSON.stringify(req)
    };

    if (formIsValid === true) {
        var response = await fetch('api/premiumcalculator', requestoptions);
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setstate({ premiumAmount: data, loading: false });
    }
}
ageHandler = event => {
    if (event <= 100 && event>= 0) {
        return true;
    }
else {
        this.setstate({ ageError: true });
        return false;
    }
};

handleChangeselect = selectedoption => {
    this.setstate({ factor: selectedoption.target.value });
    console.log('Option selected:', selectedoption.target.value);
}
handleChange = (e) => {
    this.setstate({ [e.target.name]: e.target.value });
}

render()
{
    return (
    <div className = "container">
    <div className = "row">
    <div className = "col-sm-4">
    <label className = {"labelDiv"}>
        Name <span className = "mandatory" >*
</span >
</label></div>
<div className = "col-sm-4" >
<input className = "inputDiv" type = "text" name = "name" min = "O" max = "100000"
onChange = {(e) => this.handleChange(e) }
value = {this.state.name}/>
{
    this.state.name.length < 1 && this.state.errMsg ?
    (
    <div className = "mandatory" >
        { "*" + "Please enter name" }
</div >
): null
}

</div >
</div >
<div className = "row pt-2" >
<div className = "col-sm-4" >
    <label>
        Age<span className="mandatory">*
        </ span>

    </label></div >

<div className = "col-sm-4" >
    <input
        className="inputDiv"
        type="text"
        name="age"
        type="number" maxLength="3"

        onKeyPress={(e) => this.ageHandler(e.target.value)}
        onChange={(e) => this.handleChange(e)} I value = {this.state.age} />

{
    this.state.age.length < 1 && this.state.errMsg ?

    (<div className="mandatory">Please enter age</div>) : this.state.ageError &&

        (parseInt(this.state.age) > 100
            ||
            parseInt(this.state.age) < 0) ?

    <div className = "mandatory" > Please enter your age between 0 and 100.
</div > : null
} </div >


</div>
<div className = "row pt-2" >
<div className = "col-sm-4" >
<label className = {"labelDiv"}>

    Date <span className = "mandatory" >*
</ span >
</label ></div >

    <div
        className="col-sm-4">

        <input
        min="O"
        className="inputDiv"
        type="date"
max="100000"/>
        I

    </div>
</div>
<div className="row pt-2">
                    <div className="col-sm-4" >
    <label className={"labelDiv"}>
sum Insured <span className="mandatory">*
</span>

</label></div >
<div className = "col-sm-4" >

<input className = "inputDiv" name = "sumInsured"
type = "number"
                        onChange={(e) => this.handleChange(e)} value={this.state.sumInsured}
min = "O" max = "100000" step = "0.01"   />
</div >

</div >
<div className = "row pt-2" >
<div className = "col-sm-4" > <label className={"labelDiv"}>
Occupation <span className="mandatory">* </span>
</label ></div >



<div className = "col-sm-4" >

    <div>
        <select

                            className="inputDiv"
                            name="list"
                            id="list" onChange={this.CalculatePremium}>
        {this.state.occupations.map((value, index) => ( <option key={index} value={value}>
            {value}
        </option>
) ) }

</select></div >

</div ></div>
<div className = "row pt-2" >
<div className = "col-sm-4" >
    Total Premium amount
</div >

    <div className="col-sm-4">
        <span className="inputDiv" />
        I${this.state.premiumAmount} </div>
</div ></div>);
}
async populateOccupationsData()
{

    const response = await fetch('api/occupation');
 
const data = await response.json();

    console.log(data);

    this.setstate({occupations: data, loading: false });

}}