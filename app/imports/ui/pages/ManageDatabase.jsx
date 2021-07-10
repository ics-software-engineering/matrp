import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';

const ManageDatabase = ({ ready }) => ((ready) ? (<Container>
  <Header as="h2" textAlign="center">Manage Database</Header>
  <UploadFixture />
  <DumpDbFixture />
</Container>) : <Loader active>Getting data</Loader>);

ManageDatabase.propTypes = {
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const ready = AdminProfiles.subscribe().ready() && Stuffs.subscribeStuffAdmin().ready() && UserProfiles.subscribe().ready();
  return {
    ready,
  };
})(ManageDatabase);
