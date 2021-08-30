import react from 'react'

export default class Converter extends react.Component {
    constructor(props){
        super(props)
        this.inputId =['first','second','tree']
        this.state={
            echanger:0,
            echanging:0,
            symbol:''
        }
    }
    componentDidMount(){
        setTimeout(() => {
            console.log(this.props.all_data,this.props.data)
        }, 1000);
        
    }
    handleChange = (e) =>{
        const inputId = this.inputId
        const value = e.target.value
        const id  = e.target.id
        if(value<0) return 0
        if(inputId[0]===id) {
            this.setState({echanger:value})
            console.warn('1')
        }
        else if(inputId[1]===id){
            this.setState({echanging:value})
            console.warn('2')
        }
        else if(inputId[2]===id){
            this.setState({symbol:value})
            console.warn('3')
        }
        this.convert(id)
        setTimeout(() => {
            this.convert(id)
        }, 100);
        console.log(this.state)
    }

    price  = () =>{
        const symbol = this.state.symbol
        let usd_price = null
        this.props.all_data.data.map((data,index)=>{
            if(data.symbol===symbol){
                usd_price =  data.market_data.current_price.usd
                return 0
            }
        })
        let main_price  = this.props.data.market_data.current_price.usd
        let definitive_price = main_price/usd_price
        return definitive_price
    }
    convert = (id) =>{
        const inputId = this.inputId
        const price  = this.price()
        let echanger = parseInt(this.state.echanger)
        let echanging = parseInt(this.state.echanging)
        
        if(id===inputId[0]){
            echanging = echanger*price
            this.setState({echanging})
        }
        else if(id===inputId[1]){
            echanger = echanging/price
            this.setState({echanger})
        }
        else {
            return 0
        }
    }

    render(){
        if(this.props.data.id!==undefined)
        return <div className="row my-3">
            <div className="col-5">
                <div class="input-group input-group-sm mb-3 ">
                    <span class="input-group-text bg-dark text-light" id="inputGroup-sizing-sm">{this.props.data.symbol}</span>
                    <input type="number" class="form-control  bg-dark text-light" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={this.state.echanger} onChange={(e)=>this.handleChange(e)} id='first'/>
                </div>
            </div>
            <div className="col-5">
                <div class="input-group input-group-sm mb-3 ">
                    <input type="number" id='second' value={this.state.echanging} onChange={(e)=>this.handleChange(e)} class="form-control  bg-dark text-light" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                    <select class="form-select input-group-text bg-dark text-light" aria-label="Default select example" onChange={(e)=>this.handleChange(e)} id='tree' value={this.state.symbol}>
                        {this.props.all_data.data.map((data,index)=>{
                            return <option  value={data.symbol} key={index}>{data.symbol}({data.id})</option>
                        })}
                    </select>   
                </div>
            </div>
        </div>
        else return <div>loading ...</div>
    }
}