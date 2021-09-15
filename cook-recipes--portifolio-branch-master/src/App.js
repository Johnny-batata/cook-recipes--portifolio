import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import login from './pages/login';
import Comidas from './pages/comidas';
import Bebidas from './pages/bebidas';
import Perfil from './pages/telaDePerfil';
import Detalhes from './pages/Detalhes';
import Explorarcomidas from './pages/explorarComidas/ExplorarBebidasComidas';
import Explorar from './pages/telaDeExplorar';
import ExplorarIngredientes from './pages/explorarIngredientes';
import explorarArea from './pages/explorarArea';
import Progresso from './pages/Progresso';
import Favoritas from './pages/telaReceitasFavoritas';
import NotFound from './pages/notFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Receitas from './pages/ReceitasFeitas';

class App extends Component {
  render() {
    return (
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route path="/explorar/comidas/area" component={ explorarArea } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route path="/explorar/comidas" component={ Explorarcomidas } />
          <Route path="/explorar/bebidas" component={ Explorarcomidas } />
          <Route path="/:page/:id/in-progress" component={ Progresso } />
          <Route path="/:page/:id" render={ (props) => <Detalhes { ...props } /> } />
          <Route path="/receitas-feitas" component={ Receitas } />
          <Route path="/receitas-favoritas" component={ Favoritas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/comidas" component={ Comidas } />
          <Route exact path="/" component={ login } />
        </Switch>
      </AnimatePresence>
    );
  }
}

export default App;
