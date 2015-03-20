#
# Node.js Dockerfile
#
# https://github.com/ivanoats/nodejs
#

# Pull base image.
FROM dockerfile/python

# Install Node.js
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/v0.10.37/node-v0.10.37.tar.gz && \
  tar xvzf node-v0.10.37.tar.gz && \
  rm -f node-v0.10.37.tar.gz && \
  cd node-v0.10.37 && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc
  npm -g install gulp eslint eslint-react-plugin webpack jscs mocha nodemon

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]
