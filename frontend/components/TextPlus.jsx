import PropTypes from 'prop-types'
import ListIconPlus from './../public/images/list_plus.svg'
import Image from 'next/image'

const TextPlus = ({text}) => {
    return (
    <div className="textmedium">
        <p><Image src={ListIconPlus} height={25} width={25}/>{ text }</p>
    </div> 
    );
};

TextPlus.defaultProp={
    text: "Lorem Ipsum"
}

TextPlus.defaultProp={
    text: PropTypes.string
}

export default TextPlus;