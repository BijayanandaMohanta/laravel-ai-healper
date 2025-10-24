import React from "react";

const Home = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1 className="display-5 fw-bold mb-3">Laravel AI Helper</h1>
          <p className="lead text-muted">
            A smart assistant built to accelerate Laravel development — with or
            without AI.
          </p>
          <hr className="my-4" />
          <p className="text-muted">
            Whether you're debugging migrations, generating artisan commands, or
            scaffolding routes and controllers, this tool helps you do it
            faster. Powered by AI for intelligent suggestions, syntax
            validation, and code generation — but also equipped with manual
            utilities for developers who prefer full control.
          </p>
          <div className="mt-4">
            <span className="badge bg-primary me-2">AI-Powered Code Fixes</span>
            <span className="badge bg-success me-2">Manual Artisan Tools</span>
            <span className="badge bg-warning text-dark">
              Laravel-Specific Utilities
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
