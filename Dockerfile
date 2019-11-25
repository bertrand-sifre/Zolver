FROM debian:9

RUN apt-get update
RUN apt-get install -y g++ python3-dev python3 python3-pip python3-tk git
RUN apt-get install -y libsm6 libxext6 libxrender-dev
RUN apt-get install -y curl
RUN pip3 install --upgrade pip setuptools
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y git
ADD https://api.github.com/repos/bertrand-sifre/Zolver/git/refs/heads/master version.json
RUN git clone https://github.com/bertrand-sifre/Zolver.git
RUN pip3 install -r /Zolver/src/python/requirements.txt

WORKDIR /Zolver
RUN npm i
CMD ["node_modules/.bin/npm-run-all", "--parallel", "api", "server"]