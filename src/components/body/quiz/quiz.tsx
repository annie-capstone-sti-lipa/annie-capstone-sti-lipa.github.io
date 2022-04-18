import "./quiz.scss";

export default function Quiz() {
  return (
    <div className="quiz">
      <div>Choose the corresponding reading for the character below.</div>
      <CharacterCard character="せ" />
      <div className="choice-card-container">
        <ChoiceCard choice="sa" />
        <ChoiceCard choice="ra" />
        <ChoiceCard choice="pa" />
        <ChoiceCard choice="la" />
      </div>
    </div>
  );
}

function CharacterCard({ character }: { character: string }) {
  return <div className="character-card">{character}</div>;
}

function ChoiceCard({ choice }: { choice: string }) {
  return <div className="choice-card">{choice}</div>;
}
