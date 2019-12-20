import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'redux-zero/react';
import { Router } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Footer from './Components/Footer';

import { theme, elevation2 } from './assets/jss/theme';

export default function App(props) {
  const { store, history } = props;

  const mainRaised = {
    background: elevation2,
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  };

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <div>
            <Container style={mainRaised}>
              <Typography variant="h1">Hi</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus vestibulum lectus fringilla, pellentesque lectus sit
                amet, ultricies est. Sed ligula sapien, dignissim eleifend
                placerat id, sollicitudin eu dolor. Aenean ornare tempus nibh
                sed rutrum. Integer vulputate euismod mi, et semper ante gravida
                ut. Fusce ut ullamcorper lectus, a tincidunt mi. Integer aliquam
                congue enim euismod faucibus. Quisque ac auctor magna. Nam
                pretium placerat nulla nec gravida. Praesent est elit, porttitor
                at magna ac, pulvinar bibendum turpis. Etiam in nibh lorem. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Maecenas nec lacus feugiat, aliquet leo
                vel, pulvinar dolor. Ut convallis lectus non velit accumsan
                condimentum. Aliquam eu purus non ante tincidunt tempus. Morbi
                quis blandit sapien, ut aliquam ipsum. Nunc volutpat lectus est,
                nec condimentum lorem malesuada ac. Quisque vel urna euismod,
                molestie enim nec, varius est. Nulla ut sapien a nulla rutrum
                sagittis nec in nulla. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Sed dictum
                interdum congue. Suspendisse aliquam ut nunc sit amet auctor.
                Donec fringilla tempor augue eget tempus. Vestibulum faucibus
                lectus lacus, id faucibus elit vulputate vitae. Quisque at purus
                urna. In tempor tellus ut risus consequat ultricies. Fusce eu
                quam ut ipsum dictum faucibus at ut magna. Maecenas nec ligula
                urna. Fusce ut neque mauris. Sed metus neque, pretium ut ornare
                fringilla, accumsan vitae leo. Aenean volutpat blandit porta.
                Curabitur in mauris posuere, hendrerit arcu a, sollicitudin
                massa. Proin a semper enim, non bibendum dolor. Proin iaculis,
                metus id varius facilisis, felis nisi fringilla lorem, non
                feugiat felis nisl eget nunc. Morbi nec massa sit amet neque
                porttitor commodo a vitae eros. Sed consequat ligula ut leo
                rhoncus pulvinar quis at nulla. Morbi accumsan, urna ut
                tincidunt porta, mi magna luctus nunc, eget condimentum tortor
                erat ac libero. Cras hendrerit quam vitae elementum ullamcorper.
                Quisque metus ipsum, maximus sed feugiat ac, rutrum vitae magna.
                Proin suscipit ligula maximus, gravida mi sed, lobortis ligula.
                Duis commodo tellus vitae justo finibus dapibus. Nullam blandit
                blandit sapien ac ullamcorper. Curabitur vel bibendum nunc.
                Suspendisse potenti. Mauris ante nisl, bibendum ac posuere
                vitae, aliquet nec est. Suspendisse tincidunt sollicitudin purus
                non tempor. Fusce posuere eros ac lorem sagittis, quis tristique
                purus auctor. Vestibulum venenatis elit ac gravida aliquet.
                Proin placerat porta quam, eu volutpat tortor malesuada eu.
                Nullam suscipit orci nec pharetra dapibus. Morbi quis elementum
                elit, facilisis vehicula urna. Mauris ut arcu vel enim
                sollicitudin efficitur. Curabitur varius, erat sit amet
                convallis rhoncus, tortor eros elementum ante, eu bibendum felis
                diam consectetur orci. In vulputate ultrices dolor vel
                facilisis. Donec egestas ante sed nulla bibendum tristique.
                Nullam ut pellentesque diam. Quisque molestie bibendum mauris
                quis rutrum. Nullam cursus rutrum nibh, ac mollis purus vehicula
                eu. Nunc hendrerit lorem eget euismod sodales. Sed dui turpis,
                congue quis ligula in, accumsan pellentesque neque. Suspendisse
                nec nulla ex. Fusce tempor, elit consequat dictum vehicula,
                nulla dolor gravida arcu, et consequat magna sem in nisl. Aenean
                in lacinia tortor. Pellentesque est metus, eleifend nec lectus
                at, vehicula viverra est. Duis finibus finibus rutrum.
                Pellentesque commodo tristique felis vitae faucibus. Nunc
                faucibus tellus quis congue iaculis. Nullam et malesuada lorem.
                Curabitur magna dui, lobortis at malesuada at, sodales ac
                tortor. Suspendisse potenti. Cras ultricies non diam sed
                venenatis. Donec efficitur tincidunt velit id pretium. Quisque
                vel eleifend nulla. Nulla facilisis accumsan nisl, sit amet
                ultrices nibh ultricies eu. Mauris euismod leo lacus, in
                lobortis justo cursus sit amet. Aliquam pharetra augue et orci
                dignissim, auctor egestas elit venenatis. Phasellus at iaculis
                justo, a bibendum orci. Duis id justo lacinia, lobortis justo
                vitae, finibus velit. Suspendisse a enim eu quam consequat
                placerat. Ut eu lorem tempus, pharetra quam eu, pulvinar urna.
                Pellentesque aliquet ligula molestie augue eleifend finibus.
                Phasellus tincidunt aliquet tristique. Morbi dapibus, turpis
                vitae gravida sollicitudin, sem ex vestibulum turpis, euismod
                vulputate nulla eros ut risus. Sed fermentum odio vitae viverra
                pulvinar. Nullam mattis euismod ligula at suscipit. Aenean
                vestibulum erat in tortor accumsan, id elementum erat porta.
                Donec nec turpis lacus. Duis eu pulvinar diam. Pellentesque
                malesuada rutrum diam, eget lobortis risus placerat non. Donec
                sit amet egestas orci, non rutrum est. Donec non porttitor
                tellus, id placerat ipsum. Vestibulum nibh eros, hendrerit
                aliquet mauris vel, volutpat tincidunt erat. Curabitur elit
                magna, eleifend a dui vel, vestibulum malesuada tellus. Sed
                auctor urna eu interdum facilisis. Integer lectus lacus,
                condimentum sagittis leo eget, sodales porta risus. Duis ac
                justo vitae massa mattis laoreet id ut purus. Vestibulum in mi
                tristique, vehicula tellus et, tempor nisi. Aenean a lorem sit
                amet arcu tristique tincidunt. Quisque semper dignissim arcu sed
                fringilla. Aenean non faucibus ipsum. Duis eget dolor quis mi
                bibendum mattis. Integer eget lectus et lacus eleifend pharetra
                nec eu augue. Nunc massa sapien, consequat vel urna ac, dapibus
                aliquet ligula. Morbi viverra, lectus non finibus fringilla, dui
                est varius massa, a blandit mi nisi vitae ante. Aenean in
                bibendum sem. Proin sagittis nisi non blandit sodales. Sed
                dignissim, sapien id congue bibendum, nisl metus suscipit ante,
                nec convallis augue lorem vel purus. Ut porta, massa at vehicula
                imperdiet, risus metus dapibus mi, placerat ornare tellus dolor
                eget odio. Quisque nec nibh aliquam, ullamcorper risus quis,
                blandit mi. Quisque porttitor neque ut eros blandit, aliquet
                tristique risus commodo. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia Curae; Integer
                sit amet tincidunt ante. Phasellus consectetur turpis in enim
                finibus, in elementum odio ultricies. Vestibulum volutpat, neque
                vel semper sollicitudin, orci risus imperdiet nisl, non iaculis
                leo orci porttitor felis. Cras luctus, ex et egestas accumsan,
                nunc dolor viverra odio, non ullamcorper sem nisl at ipsum.
                Integer nisi nulla, pretium ut feugiat id, scelerisque a urna.
                Cras ipsum ante, tristique et ante vitae, accumsan vestibulum
                est. Nunc vel orci at lacus gravida tempus ac eget risus. Donec
                at nibh magna. Etiam pellentesque scelerisque tortor et
                tincidunt. Sed laoreet risus nec vulputate malesuada. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Maecenas fringilla felis ac mi placerat,
                eu iaculis justo posuere.
              </Typography>
            </Container>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
