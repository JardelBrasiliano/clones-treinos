import * as Style from './styles';

export default function Section({ variant, title, description }) {
  const buttonvarient = Math.round(Math.random());

  return (
    <>
      <Style.Container className={variant}>
        <Style.HeaderWrapper>
          <Style.Header>
            <h1>
              <Style.DropboxLogo />
              <span>Dropbox</span>
            </h1>

            <button>{buttonvarient === 0 ? 'Interagir' : 'Conectar'}</button>
          </Style.Header>
        </Style.HeaderWrapper>

        <Style.Content>
          <h2>{title}</h2>
          <p>{description}</p>
        </Style.Content>
      </Style.Container>
    </>
  );
}
