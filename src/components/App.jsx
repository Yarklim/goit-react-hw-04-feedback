import { useState } from 'react';
import { Section } from './Section';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistic } from './Statistics';
import { Notification } from './Notification';
import s from './App.module.scss';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onFeedbackClick = option => {
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const sumTotalButtonClick = () => {
    return good + neutral + bad;
  };

  const getPositivePercentage = () => {
    const total = sumTotalButtonClick();
    return Math.round((good / total) * 100) || 0;
  };

  return (
    <div className={s.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onButtonClick={onFeedbackClick}
        />
      </Section>
      <Section title="Statistic">
        {sumTotalButtonClick() > 0 ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={sumTotalButtonClick()}
            positivePercentage={getPositivePercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
