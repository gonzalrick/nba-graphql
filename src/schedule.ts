import { ProxyHandler } from 'aws-lambda';
import gql from 'graphql-tag';

import { getClient } from './utils/getClient';
import { success } from './utils/response';

export default <ProxyHandler>async function(event) {
  const client = await getClient();
  const { data } = await client.query({
    query: gql`
      query getSchedule($date: String!) {
        schedule(date: $date) {
          gameId
          clock
          isGameActivated
          startDateEastern
          startTimeUTC
          nugget
          period {
            current
            isEndOfPeriod
            isHalftime
            maxRegular
          }
          hTeam {
            triCode
            score
            win
            loss
            city
            fullName
            confName
            divName
            logo
          }
          vTeam {
            triCode
            score
            win
            loss
            city
            fullName
            confName
            divName
            logo
          }
        }
      }
    `,
    fetchPolicy: 'network-only',
    variables: { date: '20190101' },
  });

  return success(data.schedule);
};
