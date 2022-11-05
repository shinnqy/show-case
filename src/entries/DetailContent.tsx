import { IconButton, mergeStyles } from '@fluentui/react';
import React, { useMemo } from 'react';
import { COUNTRIES } from '../constants';

interface IOwnProps {
  conntryId: string;
}
export const DetailContent = React.memo(function DetailContent(
  props: IOwnProps
) {
  return (
    <div
      className={mergeStyles({
        color: '#fff',
        padding: 10,
      })}
    >
      detail content
    </div>
  );
});
