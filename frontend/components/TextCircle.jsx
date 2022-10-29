import PropTypes from 'prop-types'
import ListIconCircle from './../public/images/list_circle.svg'
import Image from 'next/image'

const TextCircle = ({text}) => {
    return (
    <div className="textsmall">
        <Image src={ListIconCircle} height={40} width={40}/><p>{ text }</p>
    </div> 
    );
};

TextCircle.defaultProp={
    text: "Lorem Ipsum"
}

TextCircle.defaultProp={
    text: PropTypes.string
}

export default TextCircle;