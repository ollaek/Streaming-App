import React from "react";
import Modal from "../modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../Actions";

class StreamDelete extends React.Component {
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions(){
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id) } className="ui button negative">Delete</button>
        <button className="ui button">Cancel</button>
      </React.Fragment>
    );
  }

  renderContent(){
    if(!this.props.stream){
      return 'Are You Sure You Want To Delete This Stream !!';
    }

    return `Are You Sure You Want To Delete the Stream With Title: ${this.props.stream.title} !!`;
  }

  render(){
    return (
        <Modal 
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream : state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps , { fetchStream, deleteStream } )(StreamDelete);
