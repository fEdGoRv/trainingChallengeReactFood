import logo from '../assets/logo.jpg';

export default function () {
    return <section id='main-header'>
        <div id='title'>
            <h1>reactfood</h1>
            <img src={logo} alt='logo-app' />
        </div>
        <button>cart</button>

    </section>
}